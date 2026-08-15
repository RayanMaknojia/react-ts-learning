import { useEffect, useState } from "react";
import type { FetchState } from "../types";

// ─────────────────────────────────────────────────────────────────────────
// A "custom hook" is just a normal function whose name starts with `use`
// and which is allowed to call other hooks inside it. It lets us package
// up a chunk of stateful logic (loading/error/data + the effect that
// fetches) and reuse it from any component.
//
// `<T>` makes this GENERIC: the caller decides what type the resolved
// data will be. Example call sites:
//   useFetch<User[]>(getUsers, [])
//   useFetch<User>(() => getUserById(id), [id])
// ─────────────────────────────────────────────────────────────────────────

export function useFetch<T>(
  // `fetcher` is a function with NO arguments that returns a Promise<T>.
  // We accept a function (not the Promise itself) so that a fresh
  // request is created every time the effect below re-runs.
  fetcher: () => Promise<T>,
  // Mirrors useEffect's own dependency array: values that, when changed,
  // should trigger a new fetch (e.g. a user id coming from the URL).
  deps: unknown[] = []
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({     data: null,     loading: true,     error: null,   });

  useEffect(() => {
    // This flag guards against a classic race condition: if `deps`
    // changes again (or the component unmounts) before this fetch
    // finishes, we don't want the OLD, now-stale request to overwrite
    // state with outdated data. The cleanup function below flips this
    // to true, and we check it before every setState call.
    let cancelled = false;

    async function run() {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await fetcher();
        if (!cancelled) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          // `err` is typed `unknown` in modern TypeScript (we can't
          // assume what a catch block receives), so we narrow it before
          // reading `.message`.
          const message = err instanceof Error ? err.message : "Something went wrong";
          setState({ data: null, loading: false, error: message });
        }
      }
    }

    run();

    // useEffect's cleanup function. React calls this right before the
    // effect re-runs (deps changed) and when the component unmounts.
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
