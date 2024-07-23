export default class FakeFS {
  private static _fakeIndex: { key: string; value: string }[] = [];
  private static _fakeNpc: { key: string; value: string }[] = [];
  private static _fakeNarrator: { key: string; value: string }[] = [];

  private static get fakeIndex(): { key: string; value: string }[] {
    return this._fakeIndex;
  }

  public static get fakeNpc(): { key: string; value: string }[] {
    return FakeFS._fakeNpc;
  }

  public static get fakeNarrator(): { key: string; value: string }[] {
    return FakeFS._fakeNarrator;
  }

  static readFileSync(path: string): string | undefined {
    if (path.includes('narrator')) {
      const narrator = this.fakeNarrator.find((n) => n.key === path);
      return narrator ? narrator.value : undefined;
    }
    if (path.includes('npc')) {
      const npc = this.fakeNpc.find((n) => n.key === path);
      return npc ? npc.value : undefined;
    }

    if (path.includes('index')) {
      const index = this.fakeIndex.find((n) => n.key === path);
      return index ? index.value : undefined;
    }
    return undefined;
  }

  static addFakeIndex(key: string, value: string): void {
    this.fakeIndex.push({ key, value });
  }

  static addFakeNpc(key: string, value: string): void {
    this.fakeNpc.push({ key, value });
  }
  static addFakeNarrator(key: string, value: string): void {
    this.fakeNarrator.push({ key, value });
  }
  static clean(): void {
    this._fakeIndex = [];
    this._fakeNpc = [];
    this._fakeNarrator = [];
  }
}
