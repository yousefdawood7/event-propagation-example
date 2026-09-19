import { faker } from "@faker-js/faker";

const button = document
  .querySelector("button")
  ?.addEventListener("click", () => {
    product.updateProduct({
      id: faker.commerce.isbn(),
      name: faker.commerce.productName(),
    });
  });

interface Observer<TEvent, TPayload> {
  onUpdate: (eventName: TEvent, payload: TPayload) => void;
}

interface Subject<TEvent, TPayload> {
  subscribe: (eventName: TEvent, observer: Observer<TEvent, TPayload>) => void;
  notify: (eventName: TEvent, payload: TPayload) => void;
}

const PRODUCTS_EVENTS = [
  "PRODUCT:ADD",
  "PRODUCT:DELETE",
  "PRODUCT:UPDATE",
] as const;

type PRODUCTS_EVENTS_TYPE = (typeof PRODUCTS_EVENTS)[number];

class Products<TPayload extends Record<string, unknown>> implements Subject<
  PRODUCTS_EVENTS_TYPE,
  TPayload
> {
  private observers: Partial<
    Record<PRODUCTS_EVENTS_TYPE, Set<Observer<PRODUCTS_EVENTS_TYPE, TPayload>>>
  > = {};

  subscribe(
    eventName: PRODUCTS_EVENTS_TYPE,
    observer: Observer<PRODUCTS_EVENTS_TYPE, TPayload>,
  ) {
    // prettier-ignore
    if(!this.observers[eventName])
        this.observers[eventName] = new Set()

    this.observers[eventName].add(observer);

    return () => this.observers[eventName]?.delete(observer);
  }

  notify(eventName: PRODUCTS_EVENTS_TYPE, payload: TPayload) {
    this.observers[eventName]?.forEach((observer) =>
      observer.onUpdate(eventName, payload),
    );
  }

  addProduct(payload: TPayload) {
    console.log("You did add a product: ", payload);

    this.notify("PRODUCT:ADD", payload);
  }

  deleteProduct(payload: TPayload) {
    console.log("You did delete a product: ", payload);

    this.notify("PRODUCT:DELETE", payload);
  }

  updateProduct(payload: TPayload) {
    console.log("You did update a product: ", payload);

    this.notify("PRODUCT:UPDATE", payload);
  }
}

class Notification<T extends Record<string, unknown>> implements Observer<
  string,
  T
> {
  onUpdate(eventName: string, payload: T) {
    if (eventName === "PRODUCT:ADD") this.addNotification(payload);
    if (eventName === "PRODUCT:DELETE") this.deleteNotification(payload);
    if (eventName === "PRODUCT:UPDATE") this.updateNotification(payload);
  }

  addNotification(payload: T) {
    console.log("You did add a product (NOTIFICATION): ", payload);
  }

  deleteNotification(payload: T) {
    console.log("You did DELETE a product (NOTIFICATION): ", payload);
  }

  updateNotification(payload: T) {
    console.log("You did UPDATE a product (NOTIFICATION): ", payload);
  }
}

const product = new Products<{ id: string; name: string }>();
const notification = new Notification();

product.subscribe("PRODUCT:ADD", notification);
product.subscribe("PRODUCT:DELETE", notification);
product.subscribe("PRODUCT:UPDATE", notification);
