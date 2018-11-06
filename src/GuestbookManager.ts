import { observable, IObservableArray, action } from 'mobx';

export interface GuestbookEntry {
    name: string;
    email: string;
    message: string;
    id: string;
}

export type GuestbookState = Array<GuestbookEntry>;

const backendUrl: string | undefined = process.env.REACT_APP_BACKEND || 'http://localhost:5000';

export class GuestbookManager {
    public readonly state: IObservableArray<GuestbookEntry> = observable.array();

    constructor() {
        this.add = this.add.bind(this);
        this.getPersistentData();
    }

    @action
    public async remove(value: GuestbookEntry): Promise<void> {
        await this.persistentRemove(value);
        this.state.remove(value);
    }

    @action
    public async add(value: GuestbookEntry): Promise<void> {
        await this.persistentAdd(value);
        this.state.unshift(value);
    };

    @action
    protected update(data: {[key: string]: {name: string, email: string, message: string}}): void {
        this.state.clear();
        for (const dataId in data) {
            if (data[dataId] != null) {
                this.state.push({...data[dataId], id: dataId});
            }
        }
    }

    protected async persistentAdd(value: GuestbookEntry): Promise<void> {
        return new Promise<void>((resolve) => {
            const xhttp: XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", `${backendUrl}/add/${value.id}`);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    resolve();
                }
            };
            xhttp.onerror = () => {
                alert('Backend nicht erreichbar')
                resolve();
            }
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({name: value.name, email: value.email, message: value.message}));
        });
    }

    protected async persistentRemove(value: GuestbookEntry): Promise<void> {
        return new Promise<void>((resolve) => {
            const xhttp: XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", `${backendUrl}/remove/${value.id}`);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    resolve();
                }
            };
            xhttp.onerror = () => {
                alert('Backend nicht erreichbar')
                resolve();
            }
        });
    }

    protected getPersistentData(): void {
        const xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            const data: {[key: string]: {name: string, email: string, message: string}} = JSON.parse(xhttp.responseText);
            this.update(data);
          }
        };
        xhttp.onerror = () => {
            alert('Backend nicht erreichbar')
        }
        xhttp.open("GET", `${backendUrl}/entries`, true);
        xhttp.send();
    }
}