const Biblioteca = require('../src/Trabalho01Turma02');

describe('Teste da classe Biblioteca', () => {

    test('Método adicionarLivro', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        expect(biblioteca.livros).toMatchObject([{ id: 1, titulo: 'Livro 1' }]);
    });

    test('Método removerLivro', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2' });
        biblioteca.removerLivro(1);
        expect(biblioteca.livros).toMatchObject([{ id: 2, titulo: 'Livro 2' }]);
    });

    test('Método buscarLivroPorId', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3' });
        biblioteca.adicionarLivro({ id: 4, titulo: 'Livro 4' });
        expect(biblioteca.buscarLivroPorId(3)).toEqual({ id: 3, titulo: 'Livro 3' });
    });

    test('Método buscarLivroPorTitulo', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3' });
        biblioteca.adicionarLivro({ id: 4, titulo: 'Livro 4' });
        expect(biblioteca.buscarLivroPorTitulo('Livro 3')).toMatchObject([{ id: 3, titulo: 'Livro 3' }]);
    });

    test('Método listarLivros', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3' });
        biblioteca.adicionarLivro({ id: 4, titulo: 'Livro 4' });
        expect(biblioteca.listarLivros()).toHaveLength(4);
    });

    test('Método adicionarMembro', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Membro 2' });
        biblioteca.adicionarMembro({ id: 3, nome: 'Membro 3' });
        expect(biblioteca.membros).toMatchObject([
            { id: 1, nome: 'Membro 1' },
            { id: 2, nome: 'Membro 2' },
            { id: 3, nome: 'Membro 3' }
        ]);
    });

    test('Método removerMembro', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Membro 2' });
        biblioteca.adicionarMembro({ id: 3, nome: 'Membro 3' });
        biblioteca.removerMembro(2);
        expect(biblioteca.membros).toMatchObject([
            { id: 1, nome: 'Membro 1' },
            { id: 3, nome: 'Membro 3' }
        ]);
    });

    test('Método buscarMembroPorId', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Membro 2' });
        biblioteca.adicionarMembro({ id: 3, nome: 'Membro 3' });
        expect(biblioteca.buscarMembroPorId(2)).toEqual({ id: 2, nome: 'Membro 2' });
    });

    test('Método listarMembros', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Membro 2' });
        biblioteca.adicionarMembro({ id: 3, nome: 'Membro 3' });
        expect(biblioteca.listarMembros()).toHaveLength(3);
    });

    test('Método emprestarLivro', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        expect(biblioteca.emprestarLivro(1, 1)).toBe(true);
    });
    test('Método emprestarLivro com um livro que não existe', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        expect(biblioteca.emprestarLivro(2, 1)).toBe(false);
    });
    test('Método emprestarLivro para um membro que não existe', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        expect(biblioteca.emprestarLivro(1, 2)).toBe(false);
    });
    test('Método emprestarLivro para um livro que já foi emprestado', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', emprestado: true, idMembro: 1 });
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Membro 2' });
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.emprestarLivro(1, 2)).toBe(false);
    });

    test('Método devolverLivro que existe e está emprestado', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', emprestado: true, idMembro: 1 });
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.devolverLivro(1)).toBe(true);
    });
    test('Método devolverLivro que existe e está emprestado se foi excluido a propriedade idMembro e alterado o emprestado para false', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', emprestado: true, idMembro: 1 });
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.emprestarLivro(1, 1);
        biblioteca.devolverLivro(1)
        expect(biblioteca.buscarLivroPorId(1)).toEqual({ id: 1, titulo: 'Livro 1', emprestado: false });
    });
    test('Método devolverLivro que não existe', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', emprestado: true, idMembro: 1 });
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.devolverLivro(2)).toBe(false);
    });
    test('Método devolverLivro que não está emprestado', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', emprestado: false });
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        expect(biblioteca.devolverLivro(1)).toBe(false);
    });

    test('Método listarLivrosEmprestados', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', emprestado: true, idMembro: 1 });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2', emprestado: false });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3', emprestado: true, idMembro: 2 });

        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Membro 2' });

        biblioteca.emprestarLivro(1, 2);
        biblioteca.emprestarLivro(2, 3);


        expect(biblioteca.listarLivrosEmprestados()).toMatchObject([
            { id: 1, titulo: 'Livro 1', emprestado: true, idMembro: 1 },
            { id: 3, titulo: 'Livro 3', emprestado: true, idMembro: 2 }
        ]);
    });

    test('Método listarLivrosDisponiveis', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', emprestado: true, idMembro: 1 });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2', emprestado: false });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3', emprestado: true, idMembro: 2 });

        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Membro 2' });

        biblioteca.emprestarLivro(1, 2);
        biblioteca.emprestarLivro(2, 3);

        expect(biblioteca.listarLivrosDisponiveis()).toMatchObject([
            { id: 2, titulo: 'Livro 2', emprestado: false }
        ]);
    });

    test('Método contarLivros', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3' });
        biblioteca.adicionarLivro({ id: 4, titulo: 'Livro 4' });
        expect(biblioteca.contarLivros()).toBe(4);
    })

    test('Método contarMembros', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarMembro({ id: 1, nome: 'Membro 1' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Membro 2' });
        biblioteca.adicionarMembro({ id: 3, nome: 'Membro 3' });
        expect(biblioteca.contarMembros()).toBe(3);
    });

    test('Método listarLivrosPorAutor', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', autor: 'Autor 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2', autor: 'Autor 2' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3', autor: 'Autor 1' });
        biblioteca.adicionarLivro({ id: 4, titulo: 'Livro 4', autor: 'Autor 2' });
        expect(biblioteca.listarLivrosPorAutor('Autor 1')).toMatchObject([
            { id: 1, titulo: 'Livro 1', autor: 'Autor 1' },
            { id: 3, titulo: 'Livro 3', autor: 'Autor 1' }
        ]);
    });

    test('Método listarLivrosPorGenero', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', genero: 'Genero 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2', genero: 'Genero 2' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3', genero: 'Genero 1' });
        biblioteca.adicionarLivro({ id: 4, titulo: 'Livro 4', genero: 'Genero 2' });
        expect(biblioteca.listarLivrosPorGenero('Genero 1')).toMatchObject([
            { id: 1, titulo: 'Livro 1', genero: 'Genero 1' },
            { id: 3, titulo: 'Livro 3', genero: 'Genero 1' }
        ]);
    });

    test('Método atualizarInformacaoLivro', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', autor: 'Autor 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2', autor: 'Autor 2' });
        biblioteca.atualizarInformacaoLivro(1, { autor: 'Autor 2' });
        expect(biblioteca.buscarLivroPorId(1)).toMatchObject({ id: 1, titulo: 'Livro 1', autor: 'Autor 2' });
    });
    test('Método atualizarInformacaoLivro que não existe', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', autor: 'Autor 1' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2', autor: 'Autor 2' });
        biblioteca.atualizarInformacaoLivro(3, { autor: 'Autor 2' });
        expect(biblioteca.buscarLivroPorId(3)).toBeUndefined();
    });

    test('Método listarLivrosPorAno', () => {
        const biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Livro 1', ano: 2020 });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Livro 2', ano: 2021 });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Livro 3', ano: 2020 });
        biblioteca.adicionarLivro({ id: 4, titulo: 'Livro 4', ano: 2021 });
        expect(biblioteca.listarLivrosPorAno(2020)).toMatchObject([
            { id: 1, titulo: 'Livro 1', ano: 2020 },
            { id: 3, titulo: 'Livro 3', ano: 2020 }
        ]);
    });

});

