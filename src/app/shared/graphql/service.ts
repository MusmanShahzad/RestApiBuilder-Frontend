import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type User = {
   __typename?: 'user';
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  userType?: Maybe<Scalars['Int']>;
  createdDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Buildings = {
   __typename?: 'buildings';
  _id?: Maybe<Scalars['ID']>;
  buildingId?: Maybe<Building>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Agent = {
   __typename?: 'agent';
  _id?: Maybe<Scalars['ID']>;
  userId?: Maybe<User>;
  buildings?: Maybe<Array<Maybe<Buildings>>>;
  createdDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type TenantsHistory = {
   __typename?: 'tenantsHistory';
  _Id?: Maybe<Scalars['ID']>;
  tenantsId?: Maybe<Tenant>;
  joinedDate?: Maybe<Scalars['String']>;
  removeDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Room = {
   __typename?: 'room';
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  building?: Maybe<Building>;
  ownersId?: Maybe<Owner>;
  tenantId?: Maybe<Tenant>;
  tenantsHistory?: Maybe<Array<Maybe<TenantsHistory>>>;
  createdDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Rooms = {
   __typename?: 'rooms';
  roomId?: Maybe<Room>;
};

export type Tenant = {
   __typename?: 'tenant';
  _id?: Maybe<Scalars['ID']>;
  userId?: Maybe<User>;
  roomId?: Maybe<Room>;
  createdDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Requests = {
   __typename?: 'requests';
  roomId?: Maybe<Room>;
  date?: Maybe<Scalars['String']>;
  userId?: Maybe<User>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Owner = {
   __typename?: 'owner';
  _id?: Maybe<Scalars['ID']>;
  userId?: Maybe<User>;
  buildings?: Maybe<Array<Maybe<Buildings>>>;
  rooms?: Maybe<Array<Maybe<Rooms>>>;
  createdDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  requests?: Maybe<Array<Maybe<Requests>>>;
};

export type Messages = {
   __typename?: 'messages';
  userId?: Maybe<User>;
  messageType?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Building = {
   __typename?: 'building';
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  agentId?: Maybe<Agent>;
  ownersId?: Maybe<Owner>;
  status?: Maybe<Scalars['Boolean']>;
  rooms?: Maybe<Array<Maybe<Rooms>>>;
  message?: Maybe<Array<Maybe<Messages>>>;
};

export type Error = {
   __typename?: 'Error';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type RegisterData = {
   __typename?: 'registerData';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type RegisterOutput = {
   __typename?: 'registerOutput';
  Errors?: Maybe<Array<Maybe<Error>>>;
  Data?: Maybe<RegisterData>;
};

export type AddRoomOutput = {
   __typename?: 'addRoomOutput';
  Errors?: Maybe<Array<Maybe<Error>>>;
  Data?: Maybe<Room>;
};

export type AddBuildingOutput = {
   __typename?: 'addBuildingOutput';
  Errors?: Maybe<Array<Maybe<Error>>>;
  Data?: Maybe<Building>;
};

export type RoomsInput = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  RegisterUser?: Maybe<RegisterOutput>;
  LoginUser?: Maybe<RegisterOutput>;
  AddRoom?: Maybe<AddRoomOutput>;
  AddBuilding?: Maybe<AddBuildingOutput>;
  UpdateBuilding?: Maybe<AddBuildingOutput>;
};


export type MutationRegisterUserArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  userType?: Maybe<Scalars['Int']>;
};


export type MutationLoginUserArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationAddRoomArgs = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  buildingId?: Maybe<Scalars['String']>;
};


export type MutationAddBuildingArgs = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<Maybe<RoomsInput>>>;
};


export type MutationUpdateBuildingArgs = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<Maybe<RoomsInput>>>;
};

export type Query = {
   __typename?: 'Query';
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getUserById?: Maybe<User>;
  GetAllRooms?: Maybe<Array<Maybe<Room>>>;
  GetRoomById?: Maybe<Room>;
  GetAllBuilding?: Maybe<Array<Maybe<Building>>>;
  GetAllBuildingOfOwner?: Maybe<Array<Maybe<Building>>>;
  GetBuildingById?: Maybe<Building>;
};


export type QueryGetUserByIdArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryGetRoomByIdArgs = {
  roomId?: Maybe<Scalars['ID']>;
};


export type QueryGetAllBuildingOfOwnerArgs = {
  ownerId?: Maybe<Scalars['ID']>;
};


export type QueryGetBuildingByIdArgs = {
  buildingId?: Maybe<Scalars['ID']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetAllBuildingQueryVariables = {};


export type GetAllBuildingQuery = (
  { __typename?: 'Query' }
  & { GetAllBuilding?: Maybe<Array<Maybe<(
    { __typename?: 'building' }
    & Pick<Building, '_id' | 'name' | 'address' | 'status'>
    & { agentId?: Maybe<(
      { __typename?: 'agent' }
      & Pick<Agent, '_id'>
      & { userId?: Maybe<(
        { __typename?: 'user' }
        & Pick<User, '_id' | 'name' | 'email' | 'userType' | 'createdDate' | 'status'>
      )> }
    )>, ownersId?: Maybe<(
      { __typename?: 'owner' }
      & Pick<Owner, '_id'>
      & { userId?: Maybe<(
        { __typename?: 'user' }
        & Pick<User, '_id' | 'name' | 'email' | 'userType' | 'createdDate' | 'status'>
      )> }
    )>, rooms?: Maybe<Array<Maybe<(
      { __typename?: 'rooms' }
      & { roomId?: Maybe<(
        { __typename?: 'room' }
        & Pick<Room, '_id' | 'name' | 'address' | 'createdDate' | 'status'>
        & { tenantId?: Maybe<(
          { __typename?: 'tenant' }
          & Pick<Tenant, '_id'>
          & { userId?: Maybe<(
            { __typename?: 'user' }
            & Pick<User, 'name' | 'email'>
          )> }
        )> }
      )> }
    )>>> }
  )>>> }
);

export type GetBuildingByIdQueryVariables = {
  buildingId?: Maybe<Scalars['ID']>;
};


export type GetBuildingByIdQuery = (
  { __typename?: 'Query' }
  & { GetBuildingById?: Maybe<(
    { __typename?: 'building' }
    & Pick<Building, '_id' | 'name' | 'address' | 'status'>
    & { agentId?: Maybe<(
      { __typename?: 'agent' }
      & Pick<Agent, '_id'>
      & { userId?: Maybe<(
        { __typename?: 'user' }
        & Pick<User, '_id' | 'name' | 'email' | 'userType' | 'createdDate' | 'status'>
      )> }
    )>, ownersId?: Maybe<(
      { __typename?: 'owner' }
      & Pick<Owner, '_id'>
      & { userId?: Maybe<(
        { __typename?: 'user' }
        & Pick<User, '_id' | 'name' | 'email' | 'userType' | 'createdDate' | 'status'>
      )> }
    )>, rooms?: Maybe<Array<Maybe<(
      { __typename?: 'rooms' }
      & { roomId?: Maybe<(
        { __typename?: 'room' }
        & Pick<Room, '_id' | 'name' | 'address' | 'createdDate' | 'status'>
        & { tenantId?: Maybe<(
          { __typename?: 'tenant' }
          & Pick<Tenant, '_id'>
          & { userId?: Maybe<(
            { __typename?: 'user' }
            & Pick<User, 'name' | 'email'>
          )> }
        )> }
      )> }
    )>>> }
  )> }
);

export type GetAllBuildingOfOwnerQueryVariables = {
  ownerId?: Maybe<Scalars['ID']>;
};


export type GetAllBuildingOfOwnerQuery = (
  { __typename?: 'Query' }
  & { GetAllBuildingOfOwner?: Maybe<Array<Maybe<(
    { __typename?: 'building' }
    & Pick<Building, '_id' | 'name' | 'address'>
    & { agentId?: Maybe<(
      { __typename?: 'agent' }
      & Pick<Agent, '_id'>
      & { userId?: Maybe<(
        { __typename?: 'user' }
        & Pick<User, '_id' | 'name'>
      )>, buildings?: Maybe<Array<Maybe<(
        { __typename?: 'buildings' }
        & Pick<Buildings, '_id'>
      )>>> }
    )>, ownersId?: Maybe<(
      { __typename?: 'owner' }
      & Pick<Owner, '_id'>
      & { userId?: Maybe<(
        { __typename?: 'user' }
        & Pick<User, '_id' | 'name' | 'email'>
      )> }
    )> }
  )>>> }
);

export type UpdateBuildingMutationVariables = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<Maybe<RoomsInput>>>;
};


export type UpdateBuildingMutation = (
  { __typename?: 'Mutation' }
  & { UpdateBuilding?: Maybe<(
    { __typename?: 'addBuildingOutput' }
    & { Errors?: Maybe<Array<Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'error' | 'message'>
    )>>>, Data?: Maybe<(
      { __typename?: 'building' }
      & Pick<Building, '_id' | 'name' | 'address'>
      & { ownersId?: Maybe<(
        { __typename?: 'owner' }
        & Pick<Owner, '_id'>
      )> }
    )> }
  )> }
);

export type AddBuildingMutationVariables = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<Maybe<RoomsInput>>>;
};


export type AddBuildingMutation = (
  { __typename?: 'Mutation' }
  & { AddBuilding?: Maybe<(
    { __typename?: 'addBuildingOutput' }
    & { Errors?: Maybe<Array<Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'error' | 'message'>
    )>>>, Data?: Maybe<(
      { __typename?: 'building' }
      & Pick<Building, '_id' | 'name' | 'address'>
      & { ownersId?: Maybe<(
        { __typename?: 'owner' }
        & Pick<Owner, '_id'>
      )> }
    )> }
  )> }
);

export type LoginUserMutationVariables = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { LoginUser?: Maybe<(
    { __typename?: 'registerOutput' }
    & { Errors?: Maybe<Array<Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'error' | 'message'>
    )>>>, Data?: Maybe<(
      { __typename?: 'registerData' }
      & Pick<RegisterData, 'token'>
      & { user?: Maybe<(
        { __typename?: 'user' }
        & Pick<User, '_id' | 'name' | 'email' | 'userType' | 'createdDate' | 'status'>
      )> }
    )> }
  )> }
);

export const GetAllBuildingDocument = gql`
    query GetAllBuilding {
  GetAllBuilding {
    _id
    name
    address
    agentId {
      _id
      userId {
        _id
        name
        email
        userType
        createdDate
        status
      }
    }
    ownersId {
      _id
      userId {
        _id
        name
        email
        userType
        createdDate
        status
      }
    }
    status
    rooms {
      roomId {
        _id
        name
        address
        createdDate
        status
        tenantId {
          _id
          userId {
            name
            email
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllBuildingGQL extends Apollo.Query<GetAllBuildingQuery, GetAllBuildingQueryVariables> {
    document = GetAllBuildingDocument;
    
  }
export const GetBuildingByIdDocument = gql`
    query GetBuildingById($buildingId: ID) {
  GetBuildingById(buildingId: $buildingId) {
    _id
    name
    address
    agentId {
      _id
      userId {
        _id
        name
        email
        userType
        createdDate
        status
      }
    }
    ownersId {
      _id
      userId {
        _id
        name
        email
        userType
        createdDate
        status
      }
    }
    status
    rooms {
      roomId {
        _id
        name
        address
        createdDate
        status
        tenantId {
          _id
          userId {
            name
            email
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBuildingByIdGQL extends Apollo.Query<GetBuildingByIdQuery, GetBuildingByIdQueryVariables> {
    document = GetBuildingByIdDocument;
    
  }
export const GetAllBuildingOfOwnerDocument = gql`
    query GetAllBuildingOfOwner($ownerId: ID) {
  GetAllBuildingOfOwner(ownerId: $ownerId) {
    _id
    name
    address
    agentId {
      _id
      userId {
        _id
        name
      }
      buildings {
        _id
      }
    }
    ownersId {
      _id
      userId {
        _id
        name
        email
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllBuildingOfOwnerGQL extends Apollo.Query<GetAllBuildingOfOwnerQuery, GetAllBuildingOfOwnerQueryVariables> {
    document = GetAllBuildingOfOwnerDocument;
    
  }
export const UpdateBuildingDocument = gql`
    mutation UpdateBuilding($name: String, $address: String, $rooms: [roomsInput]) {
  UpdateBuilding(name: $name, address: $address, rooms: $rooms) {
    Errors {
      error
      message
    }
    Data {
      _id
      name
      address
      ownersId {
        _id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBuildingGQL extends Apollo.Mutation<UpdateBuildingMutation, UpdateBuildingMutationVariables> {
    document = UpdateBuildingDocument;
    
  }
export const AddBuildingDocument = gql`
    mutation AddBuilding($name: String, $address: String, $rooms: [roomsInput]) {
  AddBuilding(name: $name, address: $address, rooms: $rooms) {
    Errors {
      error
      message
    }
    Data {
      _id
      name
      address
      ownersId {
        _id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddBuildingGQL extends Apollo.Mutation<AddBuildingMutation, AddBuildingMutationVariables> {
    document = AddBuildingDocument;
    
  }
export const LoginUserDocument = gql`
    mutation LoginUser($email: String, $password: String) {
  LoginUser(email: $email, password: $password) {
    Errors {
      error
      message
    }
    Data {
      user {
        _id
        name
        email
        userType
        createdDate
        status
      }
      token
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginUserGQL extends Apollo.Mutation<LoginUserMutation, LoginUserMutationVariables> {
    document = LoginUserDocument;
    
  }