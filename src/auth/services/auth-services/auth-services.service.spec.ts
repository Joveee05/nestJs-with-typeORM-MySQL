import { Test, TestingModule } from '@nestjs/testing';
import { AuthServicesService } from './auth-services.service';

describe('AuthServicesService', () => {
  let service: AuthServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServicesService],
    }).compile();

    service = module.get<AuthServicesService>(AuthServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
