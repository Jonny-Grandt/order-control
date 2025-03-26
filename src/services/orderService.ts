// Types
export interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'asbestos' | 'building' | 'graffiti' | 'general';
  status: 'pending' | 'inProgress' | 'completed' | 'cancelled';
  date: string;
  description: string;
}

export interface Material {
  id: string;
  orderId: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface TimeEntry {
  id: string;
  orderId: string;
  date: string;
  hours: number;
  description: string;
}

export interface DiaryEntry {
  id: string;
  orderId: string;
  date: string;
  text: string;
}

export interface OrderPhoto {
  id: string;
  orderId: string;
  imageData: string;
  date: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: '1001',
    clientName: 'Volvo AB',
    clientEmail: 'contact@volvo.se',
    clientPhone: '070-123-4567',
    address: 'Göteborgsvägen 123, Göteborg',
    coordinates: {
      lat: 57.708870,
      lng: 11.974560
    },
    type: 'asbestos',
    status: 'inProgress',
    date: '2023-10-15',
    description: 'Asbestsanering i äldre fabrikslokal, ca 500 kvm. Särskilda säkerhetsföreskrifter gäller.'
  },
  {
    id: '1002',
    clientName: 'Ericsson',
    clientEmail: 'facilities@ericsson.com',
    clientPhone: '070-987-6543',
    address: 'Torshamnsgatan 21, Kista',
    coordinates: {
      lat: 59.405540,
      lng: 17.956790
    },
    type: 'building',
    status: 'pending',
    date: '2023-10-20',
    description: 'Fasadrengöring av kontorsbyggnad, 8 våningar. Tillgång till arbetsplattform finns.'
  },
  {
    id: '1003',
    clientName: 'Stockholm Stad',
    clientEmail: 'kontakt@stockholm.se',
    clientPhone: '08-508-00-000',
    address: 'Sergels Torg, Stockholm',
    coordinates: {
      lat: 59.332780,
      lng: 18.064890
    },
    type: 'graffiti',
    status: 'completed',
    date: '2023-10-12',
    description: 'Klottersanering av offentliga ytor runt Sergels torg. Miljövänliga medel ska användas.'
  },
  {
    id: '1004',
    clientName: 'ICA Maxi Solna',
    clientEmail: 'solna@ica.se',
    clientPhone: '08-123-4567',
    address: 'Solnavägen 5, Solna',
    coordinates: {
      lat: 59.362740,
      lng: 18.020140
    },
    type: 'general',
    status: 'pending',
    date: '2023-10-25',
    description: 'Djuprengöring av butikslokaler efter renovering, cirka 2000 kvm.'
  },
  {
    id: '1005',
    clientName: 'Skanska',
    clientEmail: 'projekt@skanska.se',
    clientPhone: '070-123-7890',
    address: 'Arenastaden, Solna',
    coordinates: {
      lat: 59.372470,
      lng: 18.002490
    },
    type: 'asbestos',
    status: 'inProgress',
    date: '2023-10-18',
    description: 'Asbestsanering inför rivning av äldre industribyggnad.'
  }
];

const mockMaterials: Material[] = [
  { id: 'm1', orderId: '1001', name: 'Skyddsdräkt', quantity: 5, unit: 'st' },
  { id: 'm2', orderId: '1001', name: 'Andningsskydd P3', quantity: 5, unit: 'st' },
  { id: 'm3', orderId: '1001', name: 'Säkerhetspåsar', quantity: 20, unit: 'st' },
  { id: 'm4', orderId: '1002', name: 'Högtryckstvätt', quantity: 1, unit: 'st' },
  { id: 'm5', orderId: '1002', name: 'Rengöringsmedel', quantity: 10, unit: 'liter' },
  { id: 'm6', orderId: '1003', name: 'Graffitiborttagningsmedel', quantity: 5, unit: 'liter' },
  { id: 'm7', orderId: '1003', name: 'Skyddshandskar', quantity: 3, unit: 'par' },
];

const mockTimeEntries: TimeEntry[] = [
  { id: 't1', orderId: '1001', date: '2023-10-15', hours: 8, description: 'Förberedelser och initial sanering' },
  { id: 't2', orderId: '1001', date: '2023-10-16', hours: 8, description: 'Fortsatt sanering av huvudområde' },
  { id: 't3', orderId: '1002', date: '2023-10-20', hours: 6, description: 'Inspektion och planering' },
  { id: 't4', orderId: '1003', date: '2023-10-12', hours: 4, description: 'Sanering av mindre klotterområden' },
  { id: 't5', orderId: '1003', date: '2023-10-13', hours: 5, description: 'Sanering av större väggytor' },
];

const mockDiaryEntries: DiaryEntry[] = [
  { id: 'd1', orderId: '1001', date: '2023-10-15', text: 'Påbörjade säkerhetsgenomgång med teamet. Alla säkerhetsprotokoller följdes. Identifierade huvudområden för sanering.' },
  { id: 'd2', orderId: '1001', date: '2023-10-16', text: 'Fortsatte med sanering av rum 3-5. Hittade ytterligare asbestmaterial i innertak som inte var dokumenterat.' },
  { id: 'd3', orderId: '1002', date: '2023-10-20', text: 'Inspekterade byggnaden och planerade arbetet. Beställde extra material för fasadrengöring.' },
  { id: 'd4', orderId: '1003', date: '2023-10-12', text: 'Avslutade saneringen av klotterytor vid södra ingången. Använde miljövänliga medel enligt krav.' },
];

// New mock data for photos
const mockPhotos: OrderPhoto[] = [
  { id: 'p1', orderId: '1001', imageData: 'https://source.unsplash.com/random/800x600/?construction', date: '2023-10-15T09:30:00Z' },
  { id: 'p2', orderId: '1001', imageData: 'https://source.unsplash.com/random/800x600/?building', date: '2023-10-15T11:15:00Z' },
  { id: 'p3', orderId: '1003', imageData: 'https://source.unsplash.com/random/800x600/?graffiti', date: '2023-10-12T14:20:00Z' },
];

// Service functions
let orders = [...mockOrders];
let materials = [...mockMaterials];
let timeEntries = [...mockTimeEntries];
let diaryEntries = [...mockDiaryEntries];
let orderPhotos = [...mockPhotos];

// Orders
export const getOrders = () => {
  return [...orders];
};

export const getOrderById = (id: string) => {
  return orders.find(order => order.id === id) || null;
};

export const searchOrders = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return orders.filter(order => 
    order.id.toLowerCase().includes(lowercaseQuery) ||
    order.clientName.toLowerCase().includes(lowercaseQuery) ||
    order.address.toLowerCase().includes(lowercaseQuery) ||
    order.type.toLowerCase().includes(lowercaseQuery)
  );
};

export const updateOrderStatus = (id: string, status: Order['status']) => {
  orders = orders.map(order => 
    order.id === id ? { ...order, status } : order
  );
  return getOrderById(id);
};

// Materials
export const getMaterialsByOrderId = (orderId: string) => {
  return materials.filter(material => material.orderId === orderId);
};

export const addMaterial = (material: Omit<Material, 'id'>) => {
  const newMaterial = {
    ...material,
    id: `m${materials.length + 1}`,
  };
  materials = [...materials, newMaterial];
  return newMaterial;
};

// Time entries
export const getTimeEntriesByOrderId = (orderId: string) => {
  return timeEntries.filter(entry => entry.orderId === orderId);
};

export const addTimeEntry = (entry: Omit<TimeEntry, 'id'>) => {
  const newEntry = {
    ...entry,
    id: `t${timeEntries.length + 1}`,
  };
  timeEntries = [...timeEntries, newEntry];
  return newEntry;
};

// Diary entries
export const getDiaryEntriesByOrderId = (orderId: string) => {
  return diaryEntries.filter(entry => entry.orderId === orderId);
};

export const addDiaryEntry = (entry: Omit<DiaryEntry, 'id'>) => {
  const newEntry = {
    ...entry,
    id: `d${diaryEntries.length + 1}`,
  };
  diaryEntries = [...diaryEntries, newEntry];
  return newEntry;
};

// Photos
export const getPhotosByOrderId = (orderId: string) => {
  return orderPhotos.filter(photo => photo.orderId === orderId);
};

export const addOrderPhoto = (photo: Omit<OrderPhoto, 'id'>) => {
  const newPhoto = {
    ...photo,
    id: `p${orderPhotos.length + 1}`,
  };
  orderPhotos = [...orderPhotos, newPhoto];
  return newPhoto;
};

export const deleteOrderPhoto = (photoId: string) => {
  orderPhotos = orderPhotos.filter(photo => photo.id !== photoId);
  return true;
};
