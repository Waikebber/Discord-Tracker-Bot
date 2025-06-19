export class BaseHandler {
  constructor(watch) {
    this.watch = watch;
  }

  // Seed lastSeen without sending
  async seed(lastSeen) {
    throw new Error('seed() not implemented');
  }

  // Poll once: returns array of { entry, msg }
  async poll(lastSeen, filterPost) {
    throw new Error('poll() not implemented');
  }
}