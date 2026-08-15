module.exports = function(eleventyConfig) {
  
  // 1. PASSTHROUGH COPY (Copiar arquivos estáticos diretamente)
  // Copia pastas/arquivos para a pasta final de saída sem processá-los
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");

  
  // 2. FILTROS CUSTOMIZADOS (Usados no Nunjucks)
  
  // Exemplo A: Formatação de data
  eleventyConfig.addFilter("dataFormatada", function(dateObj) {
    return new Date(dateObj).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  });

  // Exemplo B: Limitar quantidade de itens em um array (útil para posts recentes)
  eleventyConfig.addFilter("limitar", function(array, limit) {
    return array.slice(0, limit);
  });


  // 3. SHORTCODES (Componentes reutilizáveis em Nunjucks)
  // Exemplo: {% anoAtual %} insere o ano corrente
  eleventyConfig.addShortcode("anoAtual", () => `${new Date().getFullYear()}`);


  // 4. CONFIGURAÇÃO DE PASTAS E TEMPLATES
  return {
    // Define os motores de template padrão para processar páginas e arquivos
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    pathPrefix: "/lyiar-cs_blog/",

    // Estrutura de diretórios do projeto
    dir: {
      input: "src",          // Pasta onde ficam suas páginas e layouts
      includes: "_includes", // Pasta para layouts e parciais (relativa ao input)
      data: "_data",         // Pasta para dados globais (JSON/JS)
      output: "_site"        // Pasta onde o site final será gerado
    }
  };
};