using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFinancesAPI.Data;
using MyFinancesAPI.Models;
using System.Security.Cryptography;

namespace MyFinancesAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsuariosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsuarios()
    {
        var usuarios = await _context.Usuarios
            .OrderBy(u => u.Nome)
            .Select(u => new { u.Id, u.Nome, u.Email, u.CriadoEm })
            .ToListAsync();

        return Ok(usuarios);
    }

    [HttpPost]
    public async Task<IActionResult> CriarUsuario([FromBody] CriarUsuarioDto input)
    {
        if (string.IsNullOrWhiteSpace(input.Nome) ||
            string.IsNullOrWhiteSpace(input.Email) ||
            string.IsNullOrWhiteSpace(input.Senha))
            return BadRequest(new { mensagem = "Nome, email e senha são obrigatórios." });

        var emailJaExiste = await _context.Usuarios
            .AnyAsync(u => u.Email.ToLower() == input.Email.ToLower());

        if (emailJaExiste)
            return BadRequest(new { mensagem = "Email já cadastrado." });

        var usuario = new Usuario
        {
            Nome = input.Nome.Trim(),
            Email = input.Email.Trim().ToLower(),
            SenhaHash = HashSenha(input.Senha),
        };

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Usuário criado com sucesso.", id = usuario.Id });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarUsuario(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario is null)
            return NotFound(new { mensagem = "Usuário não encontrado." });

        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Usuário removido com sucesso." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto input)
    {
        if (string.IsNullOrWhiteSpace(input.Email) || string.IsNullOrWhiteSpace(input.Senha))
            return BadRequest(new { mensagem = "Email e senha são obrigatórios." });

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email == input.Email.Trim().ToLower());

        if (usuario is null || !VerificarSenha(input.Senha, usuario.SenhaHash))
            return BadRequest(new { mensagem = "Email ou senha inválidos." });

        return Ok(new { id = usuario.Id, nome = usuario.Nome, email = usuario.Email });
    }

    private static string HashSenha(string senha)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(16);
        using var pbkdf2 = new Rfc2898DeriveBytes(senha, salt, 100_000, HashAlgorithmName.SHA256);
        return Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(pbkdf2.GetBytes(32));
    }

    private static bool VerificarSenha(string senha, string hash)
    {
        var parts = hash.Split(':');
        if (parts.Length != 2) return false;
        var salt = Convert.FromBase64String(parts[0]);
        using var pbkdf2 = new Rfc2898DeriveBytes(senha, salt, 100_000, HashAlgorithmName.SHA256);
        return CryptographicOperations.FixedTimeEquals(
            pbkdf2.GetBytes(32),
            Convert.FromBase64String(parts[1]));
    }
}
