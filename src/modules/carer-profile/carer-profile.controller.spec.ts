import { Test, TestingModule } from '@nestjs/testing';
import { CarerProfileController } from './carer-profile.controller';
import { CarerProfileService } from './carer-profile.service';

describe('CarerProfileController', () => {
  let controller: CarerProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarerProfileController],
      providers: [CarerProfileService],
    }).compile();

    controller = module.get<CarerProfileController>(CarerProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
