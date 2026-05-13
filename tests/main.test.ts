vi.mock('@/router', () => ({
  default: 'router',
}));

vi.mock('pinia', async (importOriginal) => {
  const mod: any = await importOriginal();

  return {
    ...mod,
    createPinia: vi.fn().mockReturnValue('pinia'),
  };
});

describe('Main.st', () => {
  const vue = require('vue');

  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  const createApp = vi.fn().mockReturnValue({
    use: useSpy,
    mount: mountSpy,
  });

  vue.createApp = createApp;

  test('should be configured with pinia and router', async () => {
    await import('@/main'); // se importa aquí, porque sino se ejecutaría antes de configurar los mocks / espías, y no se podrían espiar las funciones correctamente

    expect(vue.createApp).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app'); // comprobamos que llame a app.mount('#app');

    // console.log(useSpy.mock.calls); // para ver las llamadas a useSpy, y comprobar que se llama con 'router' y 'pinia' , pero no sabemos el orden, por eso se comprueba con toHaveBeenCalledWith, que comprueba que se ha llamado con esos argumentos, sin importar el orden
    expect(useSpy).toHaveBeenCalledWith('router'); // para esto, antes se ha hecho el mock de '@/router' para que devuelva 'router', y así comprobar que se llama a app.use(router);
    expect(useSpy).toHaveBeenCalledWith('pinia'); // para esto, antes se ha hecho el mock de 'pinia' para que devuelva 'pinia', y así comprobar que se llama a app.use(pinia);
  });
});
