using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFinancesAPI.Data;
using MyFinancesAPI.Models;

namespace MyFinancesAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DespesasController : ControllerBase
{
    private readonly AppDbContext _context;

    public DespesasController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/despesas
    [HttpGet]
    public async Task<IActionResult> GetDespesas()
    {
        var despesas = await _context.Lancamentos
            .Where(l => l.Tipo == TipoLancamento.Despesa)
            .OrderByDescending(l => l.Data)
            .ToListAsync();

        return Ok(despesas);
    }

    // POST /api/despesas
    [HttpPost]
    public async Task<IActionResult> AdicionarDespesa([FromBody] LancamentoSimples input)
    {
        if (string.IsNullOrWhiteSpace(input.Descricao))
            return BadRequest(new { mensagem = "A descrição é obrigatória." });

        if (input.Valor <= 0)
            return BadRequest(new { mensagem = "O valor deve ser maior que zero." });

        var lancamento = new Lancamento
        {
            Descricao = input.Descricao,
            Valor = input.Valor,
            Tipo = TipoLancamento.Despesa,
            Data = DateTime.UtcNow
        };

        _context.Lancamentos.Add(lancamento);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Despesa registrada com sucesso.", lancamento });
    }

    // DELETE /api/despesas/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarDespesa(int id)
    {
        var lancamento = await _context.Lancamentos
            .FirstOrDefaultAsync(l => l.Id == id && l.Tipo == TipoLancamento.Despesa);

        if (lancamento is null)
            return NotFound(new { mensagem = "Despesa não encontrada." });

        _context.Lancamentos.Remove(lancamento);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Despesa removida com sucesso." });
    }
}