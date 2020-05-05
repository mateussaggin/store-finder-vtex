import { IOClients } from "@vtex/api";
import { MasterdataClient } from "./Masterdata";

export class Clients extends IOClients {
  public get masterdata() {
    return this.getOrSet("masterdata", MasterdataClient);
  }
}
