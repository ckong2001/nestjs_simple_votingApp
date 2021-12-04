import { ApiProperty } from "@nestjs/swagger";

export class AllVotingDTO {
    @ApiProperty()
    start:string;
    @ApiProperty()
    end:string;
}
