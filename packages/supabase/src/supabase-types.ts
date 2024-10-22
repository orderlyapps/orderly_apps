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
      congregations: {
        Row: {
          created_at: string
          created_by: string
          id: string
          name: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "congregations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "congregations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "congregations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "congregations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "congregations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "congregations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      outlines: {
        Row: {
          id: string
          theme: string
        }
        Insert: {
          id: string
          theme: string
        }
        Update: {
          id?: string
          theme?: string
        }
        Relationships: []
      }
      speaker_availability: {
        Row: {
          availability: number
          speaker_id: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          availability?: number
          speaker_id?: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          availability?: number
          speaker_id?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
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
          {
            foreignKeyName: "speaker_availability_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaker_availability_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaker_availability_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaker_availability_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
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
          outline_id: string
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
          {
            foreignKeyName: "speaker_outlines_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      speakers_incoming: {
        Row: {
          congregation_id: string
          outline_id: string
          speaker_id: string
          updated_at: string
          updated_by: string
          week_id: string
        }
        Insert: {
          congregation_id?: string
          outline_id?: string
          speaker_id?: string
          updated_at?: string
          updated_by?: string
          week_id: string
        }
        Update: {
          congregation_id?: string
          outline_id?: string
          speaker_id?: string
          updated_at?: string
          updated_by?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "incoming_speakers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_speakers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "speaker_schedule"
            referencedColumns: ["congregation_id"]
          },
          {
            foreignKeyName: "incoming_speakers_outline_id_fkey"
            columns: ["outline_id"]
            isOneToOne: false
            referencedRelation: "outlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speakers_incoming_speaker_id_outline_id_fkey"
            columns: ["speaker_id", "outline_id"]
            isOneToOne: false
            referencedRelation: "speaker_outlines"
            referencedColumns: ["speaker_id", "outline_id"]
          },
        ]
      }
      speakers_outgoing: {
        Row: {
          congregation_id: string
          outline_id: string
          speaker_id: string
          updated_at: string
          updated_by: string
          week_id: string
        }
        Insert: {
          congregation_id?: string
          outline_id?: string
          speaker_id?: string
          updated_at?: string
          updated_by?: string
          week_id: string
        }
        Update: {
          congregation_id?: string
          outline_id?: string
          speaker_id?: string
          updated_at?: string
          updated_by?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_speakers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_speakers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "speaker_schedule"
            referencedColumns: ["congregation_id"]
          },
          {
            foreignKeyName: "outgoing_speakers_outline_id_fkey"
            columns: ["outline_id"]
            isOneToOne: false
            referencedRelation: "outlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speakers_outgoing_speaker_id_outline_id_fkey"
            columns: ["speaker_id", "outline_id"]
            isOneToOne: false
            referencedRelation: "speaker_outlines"
            referencedColumns: ["speaker_id", "outline_id"]
          },
        ]
      }
      users: {
        Row: {
          auth: boolean
          congregation_id: string | null
          created_at: string
          created_by: string
          display_name: string | null
          first_name: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          auth?: boolean
          congregation_id?: string | null
          created_at?: string
          created_by?: string
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string
          updated_by?: string
        }
        Update: {
          auth?: boolean
          congregation_id?: string | null
          created_at?: string
          created_by?: string
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "speaker_schedule"
            referencedColumns: ["congregation_id"]
          },
          {
            foreignKeyName: "users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      publishers: {
        Row: {
          congregation: Json | null
          id: string | null
          name: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      speaker_details: {
        Row: {
          congregation_id: string | null
          local: boolean | null
          outline_confirmed: boolean | null
          outline_id: string | null
          outline_theme: string | null
          proposed_outline: Json | null
          speaker_confirmed: boolean | null
          speaker_id: string | null
          speakers_congregation: Json | null
          speakers_name: Json | null
          speakers_outlines: Json | null
          updated_at: string | null
          updated_by: string | null
          week_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incoming_speakers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "congregations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_speakers_congregation_id_fkey"
            columns: ["congregation_id"]
            isOneToOne: false
            referencedRelation: "speaker_schedule"
            referencedColumns: ["congregation_id"]
          },
          {
            foreignKeyName: "incoming_speakers_outline_id_fkey"
            columns: ["outline_id"]
            isOneToOne: false
            referencedRelation: "outlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_speakers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speakers_incoming_speaker_id_outline_id_fkey"
            columns: ["speaker_id", "outline_id"]
            isOneToOne: false
            referencedRelation: "speaker_outlines"
            referencedColumns: ["speaker_id", "outline_id"]
          },
        ]
      }
      speaker_schedule: {
        Row: {
          congregation_id: string | null
          congregation_name: string | null
          outgoing_speakers: Json | null
          speaker_details: Json | null
          week_id: string | null
        }
        Relationships: []
      }
      speakers: {
        Row: {
          availability: number | null
          congregation: Json | null
          id: string | null
          name: Json | null
          outlines: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
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

