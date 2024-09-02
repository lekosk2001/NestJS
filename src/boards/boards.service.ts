import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`못찾음 : ${id}`);
        }
        return found;
    }
    async createBoard({ title, description }: CreateBoardDto): Promise<Board> {
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        });
        await this.boardRepository.save(board);

        return board;
    }
    async deleteBoardById(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`못찾음 : ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
