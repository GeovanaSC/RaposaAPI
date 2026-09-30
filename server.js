const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurando as pastas estáticas
app.use(express.static(path.join(__dirname)));
app.use('/cli', express.static(path.join(__dirname, 'cli')));
app.use(express.static(path.join(__dirname, 'public')));

// Rota da API interna que consome a API pública de raposas
app.get('/api/fox/image', async (req, res) => {
    try {
        const response = await fetch('https://randomfox.ca/floof/');
        const data = await response.json();

        res.json({
            mensagem: "Aqui está uma raposinha fofa para você! 🦊",
            imagem_url: data.image
        });
    } catch (error) {
        console.error('Erro ao buscar imagem da raposa:', error);
        res.status(500).json({ erro: "Não foi possível carregar a raposa." });
    }
});

// Rota para a página principal das raposas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor de raposas rodando em: http://localhost:${PORT}`);
});