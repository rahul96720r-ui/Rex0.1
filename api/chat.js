export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.GROQ_API_KEY)return res.status(503).json({error:'AI service is not configured yet.'});
  try{
    const messages=Array.isArray(req.body?.messages)?req.body.messages:[];
    if(!messages.length||messages.length>30)return res.status(400).json({error:'Invalid conversation.'});
    const safe=messages.filter(m=>['user','assistant'].includes(m.role)&&typeof m.content==='string').map(m=>({role:m.role,content:m.content.slice(0,6000)}));
    const upstream=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Authorization':'Bearer '+process.env.GROQ_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.GROQ_MODEL||'llama-3.3-70b-versatile',messages:[{role:'system',content:'You are REX, a helpful, honest, concise personal AI assistant. Reply in the language used by the user. Explain clearly, do not invent facts, and state uncertainty when needed.'},...safe],temperature:0.7,max_tokens:1200})});
    const data=await upstream.json();
    if(!upstream.ok)return res.status(502).json({error:data?.error?.message||'AI provider request failed.'});
    return res.status(200).json({reply:data.choices?.[0]?.message?.content||'No response received.'});
  }catch(e){return res.status(500).json({error:'Server error. Please try again.'})}
}