import { z } from 'zod';

export const createInsuranceSchema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  policyNumber: z.string().min(1, 'Número da apólice é obrigatório'),
  coverage: z.string().min(1, 'Cobertura é obrigatória'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de fim é obrigatória'),
  status: z.enum(['active', 'expired', 'canceled'], {
    errorMap: () => ({ message: 'Status deve ser active, expired ou canceled' }),
  }),
});

export const updateInsuranceSchema = createInsuranceSchema.partial();

export type CreateInsuranceInput = z.infer<typeof createInsuranceSchema>;
export type UpdateInsuranceInput = z.infer<typeof updateInsuranceSchema>;
