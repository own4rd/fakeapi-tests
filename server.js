const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');


server.get('/v1/receitas/ids', (req, res) => {
  const receitas = router.db.get('receitas').value();
  const ids = receitas.map(receita => receita.id);

  res.json({ ids });
});

server.get('/v1/receitas/consulta-prescricao/:id', (req, res) => {
  const receitas = router.db.get('receitas').value();
  const receita = receitas.find(receita => receita.id === req.params.id);

  if (receita) {
    res.json(receita);
  } else {
    res.status(404).json({ message: 'Receita não encontrada' });
  }
});

server.post('/v1/receitas/consulta-prescricao/:id', (req, res) => {
    const { id } = req.params;
    const receitas = router.db.get('receitas').value();
    const receitaIndex = receitas.findIndex(receita => receita.id === id);
    if (receitaIndex !== -1) {
      receitas[receitaIndex].dispensado = true;
  
      router.db.write();
  
      res.status(200).json(receitas[receitaIndex]);
    } else {
      res.status(404).json({ message: 'Receita não encontrada' });
    }
  });

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server está rodando na porta 3000');
});
