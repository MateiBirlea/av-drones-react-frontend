var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.UseDefaultFiles();  // Activează servirea fișierului default (cum ar fi index.html)
app.UseStaticFiles();   // Servește fișiere statice (HTML, CSS, JS)

app.Run();
