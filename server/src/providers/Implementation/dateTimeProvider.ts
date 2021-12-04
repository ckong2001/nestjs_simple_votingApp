import { Injectable } from "@nestjs/common";
import { IDateTimeProvider } from "../IDateTimeProvider";

@Injectable()
export class DateTimeProvider extends IDateTimeProvider {
    public Now() : Date {
        return new Date()
    }
}