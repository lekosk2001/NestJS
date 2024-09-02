import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidation implements PipeTransform {
    readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value}는 스테이터스가 아닙니다.`);
        }

        console.log(`value : ${value}`);
        console.log(`metadata : ${metadata}`);

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
