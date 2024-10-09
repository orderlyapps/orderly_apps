export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admins: {
        Row: {
          congregation_id: string
          person_id: string
        }
        Insert: {
          congregation_id?: string
          person_id?: string
        }
        Update: {
          congregation_id?: string
          person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_admins_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_admins_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_admins_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_admins_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
        ]
      }
      congregations: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      outlines: {
        Row: {
          id: string
          theme: string
        }
        Insert: {
          id: string
          theme?: string
        }
        Update: {
          id?: string
          theme?: string
        }
        Relationships: []
      }
      people: {
        Row: {
          avatar_url: string | null
          congregation_id: string | null
          created_at: string | null
          display_name: string | null
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          congregation_id?: string | null
          created_at?: string | null
          display_name?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          congregation_id?: string | null
          created_at?: string | null
          display_name?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_people_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
        ]
      }
      public_talks_speaker: {
        Row: {
          congregation_id: string
          outline_id: string | null
          speaker_id: string
          week: string
        }
        Insert: {
          congregation_id?: string
          outline_id?: string | null
          speaker_id?: string
          week: string
        }
        Update: {
          congregation_id?: string
          outline_id?: string | null
          speaker_id?: string
          week?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_talks_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_outline_id_fkey"
            columns: ["outline_id"]
            isOneToOne: false
            referencedRelation: "outlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
        ]
      }
      speaker_availability: {
        Row: {
          availability: number
          speaker_id: string
        }
        Insert: {
          availability?: number
          speaker_id?: string
        }
        Update: {
          availability?: number
          speaker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "speaker_availability_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: true
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaker_availability_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: true
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaker_availability_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: true
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
        ]
      }
      speaker_outlines: {
        Row: {
          outline_id: string
          speaker_id: string
        }
        Insert: {
          outline_id?: string
          speaker_id?: string
        }
        Update: {
          outline_id?: string
          speaker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "speaker_outlines_outline_id_fkey"
            columns: ["outline_id"]
            isOneToOne: false
            referencedRelation: "outlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaker_outlines_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaker_outlines_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaker_outlines_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      public_talk_details: {
        Row: {
          congregation_id: string | null
          congregation_name: string | null
          display_name: string | null
          first_name: string | null
          home_congregation_id: string | null
          home_congregation_name: string | null
          last_name: string | null
          middle_name: string | null
          outline_id: string | null
          speaker_id: string | null
          theme: string | null
          week: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_people_congregation_id_fkey"
            columns: ["home_congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_outline_id_fkey"
            columns: ["outline_id"]
            isOneToOne: false
            referencedRelation: "outlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_talks_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
        ]
      }
      publishers: {
        Row: {
          admin_count: number | null
          avatar_url: string | null
          congregation_id: string | null
          congregation_name: string | null
          created_at: string | null
          display_name: string | null
          first_name: string | null
          full_name: string | null
          id: string | null
          is_admin: boolean | null
          last_name: string | null
          middle_name: string | null
          outlines: string[] | null
          speaker_availability: number | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_people_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
        ]
      }
      speakers: {
        Row: {
          admin_count: number | null
          avatar_url: string | null
          congregation_id: string | null
          congregation_name: string | null
          created_at: string | null
          display_name: string | null
          first_name: string | null
          full_name: string | null
          id: string | null
          is_admin: boolean | null
          last_name: string | null
          middle_name: string | null
          outlines: string[] | null
          speaker_availability: number | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_people_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      is_admin: {
        Args: {
          congregation_id: string
          person_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

