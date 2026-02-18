export default {
  async fetch(request) {
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent")?.toLowerCase() || "";
    const ip = request.headers.get("cf-connecting-ip") || "";
    const method = request.method;

    // 1️⃣ Only allow POST (most bots probe with GET)
    if (method !== "POST") {
      return Response.redirect("https://google.com", 302);
    }

    // 2️⃣ Block empty or missing UA (common for scanners)
    if (!ua || ua.length < 10) {
      return Response.redirect("https://google.com", 302);
    }

    // 3️⃣ Block suspicious keywords
    const blockedPatterns = [
      "bot",
      "crawler",
      "spider",
      "scan",
      "virus",
      "antivirus",
      "headless",
      "curl",
      "wget",
      "python",
      "node",
      "axios",
      "postman",
      "insomnia",
      "scrapy",
      "nmap",
      "zgrab",
      "masscan"
    ];

    if (blockedPatterns.some(p => ua.includes(p))) {
      return Response.redirect("https://google.com", 302);
    }

    // 4️⃣ Block common cloud scanner ASNs (optional)
    const badASNs = [15169, 8075]; // Google, Microsoft scanners example
    if (request.cf?.asn && badASNs.includes(request.cf.asn)) {
      return Response.redirect("https://google.com", 302);
    }

    // 5️⃣ Block low bot score (if available)
    if (request.cf?.botManagement?.score && request.cf.botManagement.score < 30) {
      return Response.redirect("https://google.com", 302);
    }

    return new Response("OK", { status: 200 });
  }
};
