import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import {
  type ITransactionRepository,
  TRANSACTION_REPOSITORY,
} from '../../domain/repositories/transaction.repository.interface';
import { CreateTransactionDto } from './create-transaction.dto';
import { TransactionType } from 'src/core/domain/enum/transaction-type.enum';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(dto: CreateTransactionDto): Promise<TransactionEntity> {
    const amountInCents = Math.round(dto.amount * 100);

    if (dto.type === TransactionType.DEBIT) {
      const balance = await this.transactionRepository.calculateBalance(
        dto.user_id,
      );

      if (dto.amount > balance) {
        throw new BadRequestException('Insufficient balance');
      }
    }

    const transaction = new TransactionEntity({
      user_id: dto.user_id,
      amount: amountInCents / 100,
      type: dto.type,
    });

    return await this.transactionRepository.create(transaction);
  }
}
