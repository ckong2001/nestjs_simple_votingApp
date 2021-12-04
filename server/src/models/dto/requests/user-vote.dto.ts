import { ApiProperty } from "@nestjs/swagger";

export class UserVoteDTO {
    @ApiProperty()
    hkId: string;
    @ApiProperty()
    votingOptionId: string;
}
