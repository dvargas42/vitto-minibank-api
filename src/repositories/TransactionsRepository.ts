import { EntityRepository, Repository } from 'typeorm';

import { Transaction } from '../models/Transaction';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async findByPeriod(dateInitial: Date, dateFinal: Date): Promise<Transaction[] | null> {
    //Posteriormente criar extrato por período
    // const findTransactions = await this.find({
    //   where: {
    //     createdAt: Between(
    //       new Date(dateFinal).toISOString(),
    //       new Date(dateInitial).toISOString(),
    //     ),
    //   });

    // return findTransactions || null;
    return null
  }
}

export { TransactionsRepository };
