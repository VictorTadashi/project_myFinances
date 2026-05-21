//Projeto C#, My Finnces, teriminal de controle financeiro

decimal saldoTotal = 0;
List<string> nomesGastos = new List<string>();
List<decimal> valoresGastos = new List<decimal>();
bool programaRodando = true;

while (programaRodando)
{
    Console.SetCursorPosition(0, 0);
    ExibirMenu();
}
void MensagemBoasVindas()
{
    Console.WriteLine(@"
█████████████████████████████████████████████████████████████████████████████
█▄─▄─▀█▄─▄▄─█▄─▀█▀─▄███▄─█─▄█▄─▄█▄─▀█▄─▄█▄─▄▄▀█─▄▄─████▀▄─██─▄▄─█████████████
██─▄─▀██─▄█▀██─█▄█─█████▄▀▄███─███─█▄▀─███─██─█─██─████─▀─██─██─█░░██░░██░░██
▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▄▀▄▄▄▀▀▀▀▀▄▀▀▀▄▄▄▀▄▄▄▀▀▄▄▀▄▄▄▄▀▀▄▄▄▄▀▀▀▄▄▀▄▄▀▄▄▄▄▀▄▄▀▀▄▄▀▀▄▄▀▀
");

    Console.WriteLine(@"
███╗░░░███╗██╗░░░██╗  ███████╗██╗███╗░░██╗░█████╗░███╗░░██╗░█████╗░███████╗░██████╗
████╗░████║╚██╗░██╔╝  ██╔════╝██║████╗░██║██╔══██╗████╗░██║██╔══██╗██╔════╝██╔════╝
██╔████╔██║░╚████╔╝░  █████╗░░██║██╔██╗██║███████║██╔██╗██║██║░░╚═╝█████╗░░╚█████╗░
██║╚██╔╝██║░░╚██╔╝░░  ██╔══╝░░██║██║╚████║██╔══██║██║╚████║██║░░██╗██╔══╝░░░╚═══██╗
██║░╚═╝░██║░░░██║░░░  ██║░░░░░██║██║░╚███║██║░░██║██║░╚███║╚█████╔╝███████╗██████╔╝
╚═╝░░░░░╚═╝░░░╚═╝░░░  ╚═╝░░░░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚═╝░░╚══╝░╚════╝░╚══════╝╚═════╝░
");
}

void ExibirMenu()
{
    MensagemBoasVindas();
    MostrarSaldo();

    Console.WriteLine("1 - Cadastrar saldo");
    Console.WriteLine("2 - Cadastrar gasto");
    Console.WriteLine("3 - Mostrar gastos");
    Console.WriteLine("4 - Sair");

    Console.Write("\nEscolha uma opção: ");

    string entrada = Console.ReadLine()!;

    // Validamos se a entrada é um número para não quebrar o programa
    if (int.TryParse(entrada, out int opcaoEscolhida))
    {
        switch (opcaoEscolhida)
        {
            case 1: CadastrarSaldo();
                break;
            case 2: CadastrarGastos();
                break;
            case 3: MostrarGastos();
                break;
            case 4:  Console.WriteLine("\nVocê fechou o programa!");
                programaRodando = false;
                break;
            default:
                Console.WriteLine("\nOpção inválida! Tente novamente.");
                Thread.Sleep(1500);
                break;
        }
    }
    else
    {
        Console.WriteLine("\nPor favor, digite um número válido.");
        Thread.Sleep(1500);
    }
}

void CadastrarSaldo()
{
    Console.Clear();
    Console.WriteLine(@"
██████████████████████████████████████████████████████████████████████████████████████
█─▄▄▄─██▀▄─██▄─▄▄▀██▀▄─██─▄▄▄▄█─▄─▄─█▄─▄▄▀██▀▄─██▄─▄▄▀███─▄▄▄▄██▀▄─██▄─▄███▄─▄▄▀█─▄▄─█
█─███▀██─▀─███─██─██─▀─██▄▄▄▄─███─████─▄─▄██─▀─███─▄─▄███▄▄▄▄─██─▀─███─██▀██─██─█─██─█
▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▀▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▄▀
");
    Console.Write("\nDigite o valor para adicionar ao saldo: R$");
    decimal valorInput = decimal.Parse(Console.ReadLine()!);

    saldoTotal += valorInput;

    Console.WriteLine($"\nR$ {valorInput} adicionado! Saldo atual: R$ {saldoTotal}");
    Thread.Sleep(2000);
    Console.Clear();
}

void CadastrarGastos()
{
    Console.Clear();
    Console.WriteLine(@"
█████████████████████████████████████████████████████████████▀████████████████████████
█─▄▄▄─██▀▄─██▄─▄▄▀██▀▄─██─▄▄▄▄█─▄─▄─█▄─▄▄▀██▀▄─██▄─▄▄▀███─▄▄▄▄██▀▄─██─▄▄▄▄█─▄─▄─█─▄▄─█
█─███▀██─▀─███─██─██─▀─██▄▄▄▄─███─████─▄─▄██─▀─███─▄─▄███─██▄─██─▀─██▄▄▄▄─███─███─██─█
▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▀▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▄▄▀
");
    Console.Write("Gasto: ");
    string nomeGasto = Console.ReadLine();
    nomesGastos.Add(nomeGasto);

    Console.Write("\nCusto: R$");
    decimal valorGasto = decimal.Parse(Console.ReadLine());
    valoresGastos.Add(valorGasto);

    saldoTotal -= valorGasto;

    Console.WriteLine($"\n{nomeGasto} de R$ {valorGasto} registrado e descontado do saldo!"); Thread.Sleep(2000);
    Thread.Sleep(2000);
    Console.Clear();
}

void MostrarSaldo()
{
//    Console.Clear();
//    Console.WriteLine(@"
//███████████████████████████████████████████████████████████████████████████
//█▄─▀█▀─▄█─▄▄─█─▄▄▄▄█─▄─▄─█▄─▄▄▀██▀▄─██▄─▄▄▀███─▄▄▄▄██▀▄─██▄─▄███▄─▄▄▀█─▄▄─█
//██─█▄█─██─██─█▄▄▄▄─███─████─▄─▄██─▀─███─▄─▄███▄▄▄▄─██─▀─███─██▀██─██─█─██─█
//▀▄▄▄▀▄▄▄▀▄▄▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▀▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▄▀
//");
    Console.WriteLine($"\nSeu saldo disponível atual é de: R$ {saldoTotal}\n");
    if (saldoTotal < 0)
    {
        Console.WriteLine("\nAtenção: Você está no vermelho!\n");
    }
    //Console.WriteLine("\nDigite algo para voltar ao menu...");
    //Console.ReadKey();
    //Console.Clear();
    //ExibirMenu();
}

void MostrarGastos()
{
    Console.Clear();
    Console.WriteLine(@"
██████████████████████████████████████████████████▀██████████████████████████████
█▄─▀█▀─▄█─▄▄─█─▄▄▄▄█─▄─▄─█▄─▄▄▀██▀▄─██▄─▄▄▀███─▄▄▄▄██▀▄─██─▄▄▄▄█─▄─▄─█─▄▄─█─▄▄▄▄█
██─█▄█─██─██─█▄▄▄▄─███─████─▄─▄██─▀─███─▄─▄███─██▄─██─▀─██▄▄▄▄─███─███─██─█▄▄▄▄─█
▀▄▄▄▀▄▄▄▀▄▄▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▀▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▄▄▀▄▄▄▄▄▀
");
    for (int i = 0; i < nomesGastos.Count; i++)
    {
        Console.WriteLine($"\nGasto: {nomesGastos[i]}");
        Console.WriteLine($"Valor: R$ {valoresGastos[i]}");
        Console.WriteLine("----------------------------\n");
    }
    Console.WriteLine("\nDigite algo para voltar ao menu...");
    Console.ReadKey();
    Console.Clear();
    ExibirMenu();
}

ExibirMenu();