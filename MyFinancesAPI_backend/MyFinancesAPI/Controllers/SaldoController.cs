using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFinancesAPI.Data;
using MyFinancesAPI.Models;

namespace MyFinancesAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SaldoController : ControllerBase
{
    private readonly AppDbContext _context;

    public SaldoController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/saldo
    [HttpGet]
    public async Task<IActionResult> GetSaldo()
    {
        var lancamentos = await _context.Lancamentos.ToListAsync();

        decimal totalReceitas = lancamentos
            .Where(l => l.Tipo == TipoLancamento.Receita)
            .Sum(l => l.Valor);

        decimal totalDespesas = lancamentos
            .Where(l => l.Tipo == TipoLancamento.Despesa)
            .Sum(l => l.Valor);

        decimal saldoAtual = totalReceitas - totalDespesas;

        return Ok(new
        {
            saldo = saldoAtual,
            totalReceitas,
            totalDespesas,
            noVermelho = saldoAtual < 0
        });
    }

    // GET /api/saldo/entradas
    [HttpGet("entradas")]
    public async Task<IActionResult> GetEntradas()
    {
        var entradas = await _context.Lancamentos
            .Where(l => l.Tipo == TipoLancamento.Receita)
            .OrderByDescending(l => l.Data)
            .ToListAsync();

        return Ok(entradas);
    }

    // POST /api/saldo
    [HttpPost]
    public async Task<IActionResult> AdicionarSaldo([FromBody] LancamentoSimples input)
    {
        if (string.IsNullOrWhiteSpace(input.Descricao))
            return BadRequest(new { mensagem = "A descrição é obrigatória." });

        if (input.Valor <= 0)
            return BadRequest(new { mensagem = "O valor deve ser maior que zero." });

        var lancamento = new Lancamento
        {
            Descricao = input.Descricao,
            Valor = input.Valor,
            Tipo = TipoLancamento.Receita,
            Data = DateTime.UtcNow
        };

        _context.Lancamentos.Add(lancamento);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Saldo adicionado com sucesso.", lancamento });
    }

    // DELETE /api/saldo/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarSaldo(int id)
    {
        var lancamento = await _context.Lancamentos
            .FirstOrDefaultAsync(l => l.Id == id && l.Tipo == TipoLancamento.Receita);

        if (lancamento is null)
            return NotFound(new { mensagem = "Entrada de saldo não encontrada." });

        _context.Lancamentos.Remove(lancamento);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Entrada de saldo removida com sucesso." });
    }
}