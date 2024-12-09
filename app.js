import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = http.createServer((req, res) => {
    // Si la solicitud es para un archivo estático (HTML, JS, CSS, etc.)
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    // Verificamos si el archivo existe
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.statusCode = 404;
            res.end('Archivo no encontrado');
            return;
        }

        // Si el archivo es un HTML, definimos el tipo de contenido
        if (extname === '.html') {
            res.setHeader('Content-Type', 'text/html');
        }
        // Si el archivo es un JavaScript, definimos el tipo de contenido
        else if (extname === '.js') {
            res.setHeader('Content-Type', 'application/javascript');
        }


        // Enviar el contenido
        res.statusCode = 200;
        res.end(content);
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});