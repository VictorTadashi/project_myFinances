namespace MyFinancesAPI.Models;

public enum TipoLancamento
{
    Receita,
    Despesa
}

public class Lancamento
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoLancamento Tipo { get; set; }
    public DateTime Data { get; set; } = DateTime.UtcNow;
}
