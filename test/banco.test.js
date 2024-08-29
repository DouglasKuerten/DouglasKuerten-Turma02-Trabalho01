
const Banco = require("../src/banco");

describe('Teste da classe banco', () => {
    let conta;

    beforeEach(() => {
        conta = new Banco('Douglas', 1500);
    });

    test('Método depositar', () => {
        expect(conta.depositar(1000)).toBe(2500);
    });

    test('Método sacar', () => {
        expect(conta.sacar(500)).toBe(1000);
        expect(() => conta.sacar(2000)).toThrow('Saldo insuficiente');
    });

    test('Método transferir', () => {
        const contaDestino = new Banco('Bruno', 500);
        conta.transferir(500, contaDestino);
        expect(conta.obterSaldo()).toBe(1000);
        expect(contaDestino.obterSaldo()).toBe(1000);
    });

    test('Método obterSaldo', () => {
        expect(conta.obterSaldo()).toBe(1500);
    });

    test('Método obterHistorico', () => {
        conta.depositar(1000);
        conta.sacar(500);
        conta.transferir(800, new Banco('Bruno', 500));
        expect(conta.obterHistorico()).toEqual([
            { tipo: 'Depósito', valor: 1000 },
            { tipo: 'Saque', valor: 500 },
            { tipo: 'Saque', valor: 800 },
            { tipo: 'Transferência', valor: 800, destino: 'Bruno' }
        ]);
    });

    test('Método definirLimiteDeSaque', () => {
        conta.definirLimiteDeSaque(500);
        expect(conta.limiteDeSaque).toBe(500);
    });

    test('Método verificarLimiteDeSaque', () => {
        conta.definirLimiteDeSaque(500);
        expect(conta.verificarLimiteDeSaque(300)).toBe(true);
        expect(() => conta.verificarLimiteDeSaque(600)).toThrow('Saque acima do limite permitido');
    });

    test('Método aplicarJuros', () => {
        conta.aplicarJuros(10);
        expect(conta.obterSaldo()).toBe(1650);
    });

    test('Método pagarConta', () => {
        conta.pagarConta(500, 'Conta de energia');
        expect(conta.obterSaldo()).toBe(1000);
        expect(conta.obterHistorico()).toEqual([
            { tipo: 'Saque', valor: 500 },
            { tipo: 'Pagamento', valor: 500, descricao: 'Conta de energia' }
        ]);
    });

    test('Método obterTotalDepositado', () => {
        conta.depositar(1000);
        conta.sacar(500);
        conta.transferir(800, new Banco('Bruno', 500));
        expect(conta.obterTotalDepositado()).toBe(1000);
    });

});
