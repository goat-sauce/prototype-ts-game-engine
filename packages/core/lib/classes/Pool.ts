export class Pool {
  public workers: Worker[]

  constructor() {
    this.workers = []
  }

  public async open(size: number) {
    for (let i = 0; i < size; i++) {
      this.workers.push(await this.employ())
    }
  }

  private employ(): Promise<Worker> {
    return new Promise((resolve, reject) => {
      const worker = new Worker('run.worker.bundle.js')
      worker.onerror = (event) => reject(event)
      worker.onmessage = () => resolve(worker)
    })
  }

  public terminate() {
    for (const worker of this.workers) {
      worker.terminate()
    }
  }
}
