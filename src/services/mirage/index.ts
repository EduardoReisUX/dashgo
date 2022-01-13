import { createServer, Factory, Model } from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    // Factory of users
    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`;
        },

        email() {
          return faker.internet.email().toLowerCase();
        },

        createdAt() {
          // From 10 days ago to today
          return faker.date.recent(10);
        },
      }),
    },

    // Creates 200 users according to the user factory
    seeds(server) {
      server.createList("user", 200);
    },

    // Creates '/api/users' route of method GET and POST with delay of 750ms
    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users");
      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
