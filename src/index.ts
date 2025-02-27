export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === "/add" && request.method === "POST") {
      const { username } = await request.json();
      await env.DB.prepare("INSERT INTO users (username) VALUES (?);").bind(username).run();
      return new Response(JSON.stringify({ status: "success", username }), { status: 200 });
    }

    if (url.pathname === "/get" && request.method === "GET") {
      const { results } = await env.DB.prepare("SELECT * FROM users;").all();
      return new Response(JSON.stringify(results), { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  }
};
