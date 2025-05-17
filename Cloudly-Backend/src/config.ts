type MicroserviceConfig = {
  id: number;
  host: string;
  port: number;
};

export const microservices: MicroserviceConfig[] = [
  {
    id: 1,
    host: '127.0.0.1',
    port: 4000,
  },
];
