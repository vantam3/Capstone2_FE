
export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: string[];
    userCount: number;
  }
  
  let rolesData: Role[] = [
    {
      id: 1,
      name: 'User',
      description: 'Standard user with basic privileges',
      permissions: [
        'View content',
        'Submit ratings',
        'Create reading lists'
      ],
      userCount: 1250
    },
    {
      id: 2,
      name: 'Moderator',
      description: 'Helps maintain platform content and discussions',
      permissions: [
        'All User permissions',
        'Review content',
        'Flag inappropriate material',
        'Edit community discussions'
      ],
      userCount: 25
    },
    {
      id: 3,
      name: 'Admin',
      description: 'Full platform administration capabilities',
      permissions: [
        'All Moderator permissions',
        'Manage users',
        'Configure system settings',
        'Access analytics',
        'Modify content database'
      ],
      userCount: 5
    }
  ];
  
  export const roleService = {
    getAll: (): Promise<Role[]> => {
      return Promise.resolve([...rolesData]);
    },
    create: (role: Omit<Role, 'id' | 'userCount'>): Promise<Role> => {
      const id = rolesData.length > 0 ? Math.max(...rolesData.map(r => r.id)) + 1 : 1;
      const newRole: Role = { ...role, id, userCount: 0 };
      rolesData.push(newRole);
      return Promise.resolve(newRole);
    },
    update: (id: number, role: Partial<Omit<Role, 'id'>>): Promise<Role> => {
      const index = rolesData.findIndex(r => r.id === id);
      if (index === -1) throw new Error('Role not found');
      rolesData[index] = { ...rolesData[index], ...role };
      return Promise.resolve(rolesData[index]);
    },
    delete: (id: number): Promise<void> => {
      rolesData = rolesData.filter(r => r.id !== id);
      return Promise.resolve();
    }
  };