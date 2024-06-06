import { Test, TestingModule } from '@nestjs/testing';
import { CarerProfileService } from './carer-profile.service';

describe('CarerProfileService', () => {
  let service: CarerProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarerProfileService],
    }).compile();

    service = module.get<CarerProfileService>(CarerProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
