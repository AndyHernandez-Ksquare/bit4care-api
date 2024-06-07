import { Controller } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly StripeService: StripeService) {}

  // @Post()
  // create(@Body() createPaymentDto: CreatePaymentHistoryDto) {
  //   return this.StripeService.create(createPaymentDto);
  // }

  // @Get()
  // findAll() {
  //   return this.StripeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.StripeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.StripeService.update(+id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.StripeService.remove(+id);
  // }
}
