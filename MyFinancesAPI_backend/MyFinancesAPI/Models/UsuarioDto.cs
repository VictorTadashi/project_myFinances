namespace MyFinancesAPI.Models;

public record CriarUsuarioDto(string Nome, string Email, string Senha);
public record LoginDto(string Email, string Senha);
