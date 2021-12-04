import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class IDateTimeProvider {
    public abstract Now() : Date;
}