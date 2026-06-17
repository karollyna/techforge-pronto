import { test, expect } from '@playwright/test';

test.describe('Fluxo de Autenticação e Navegação', () => {
  test('Deve carregar a página inicial com sucesso', async ({ page }) => {
    // Acessa a URL configurada
    await page.goto('/');

    // Verifica se o título da aplicação está correto
    await expect(page).toHaveTitle(/TechForge/i);
  });

  test('Deve exibir erro ao tentar logar com credenciais inválidas', async ({ page }) => {
    await page.goto('/login');

    // Simula a interação do usuário preenchendo o formulário
    await page.fill('input[type="email"]', 'usuario.invalido@teste.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');

    // Verifica se uma mensagem de alerta ou erro aparece na tela
    const errorMessage = page.locator('.error-message, [role="alert"]');
    await expect(errorMessage).toBeVisible();
  });
});