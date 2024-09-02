import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidation } from './pipes/board-staus-validtion.pipe';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoardById(id);
    }

    @Put('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidation) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
