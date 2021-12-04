import { ApiProperty } from "@nestjs/swagger";

export class CreateVoteDTO {
    @ApiProperty()
    title: string;
    @ApiProperty()
    start:Date;
    @ApiProperty()
    end:Date;
    @ApiProperty()
    votingOption: string[];
}
