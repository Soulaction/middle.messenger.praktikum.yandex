import { Router } from '../Routing/Router.ts';

type Navigate = {
  go: <T>(pathname: string, state?: T) => void,
  forward: () => void,
  back: () => void,
  history: History
};

export const navigate = (): Navigate => {
  const router = Router.getRouterInstance();

  return {
    go: router.go.bind(router),
    forward: router.forward.bind(router),
    back: router.back.bind(router),
    history: router.history,
  };
};
