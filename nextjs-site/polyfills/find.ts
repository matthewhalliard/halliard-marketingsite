// Polyfill for NodeList.prototype.find and HTMLCollection.prototype.find
// Executes as soon as the module is evaluated (import once in _app.tsx).

/* eslint-disable @typescript-eslint/no-explicit-any */
const installFind = (proto: any) => {
  if (!proto || proto.find) return;
  Object.defineProperty(proto, 'find', {
    value(predicate: any, thisArg?: any) {
      return Array.prototype.find.call(this, predicate, thisArg);
    },
    configurable: true,
    writable: true,
  });
};

if (typeof window !== 'undefined') {
  const NL = (globalThis as any).NodeList;
  const HC = (globalThis as any).HTMLCollection;
  if (NL && NL.prototype) installFind(NL.prototype);
  if (HC && HC.prototype) installFind(HC.prototype);
} 