"""Local preview with clean URLs, like the live site (/about serves about.html).

Run from the project folder:  python3 scripts/serve.py   then open http://localhost:8000
"""
import http.server
import os
import socketserver

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
PORT = 8000


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path, _, query = self.path.partition("?")
        if "." not in os.path.basename(path) and path != "/" and not path.endswith("/"):
            if os.path.isfile(os.path.join(ROOT, path.lstrip("/") + ".html")):
                self.path = path + ".html" + ("?" + query if query else "")
        return super().send_head()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
    print(f"Previewing at http://localhost:{PORT}  (Ctrl-C to stop)")
    httpd.serve_forever()
