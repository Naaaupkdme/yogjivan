export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      automation_locks: {
        Row: {
          expires_at: string
          name: string
          owner: string
        }
        Insert: {
          expires_at: string
          name: string
          owner: string
        }
        Update: {
          expires_at?: string
          name?: string
          owner?: string
        }
        Relationships: []
      }
      automation_settings: {
        Row: {
          dispatch_token: string
          id: number
          sheet_enabled: boolean
          sheet_gid: number | null
          sheet_tab: string | null
          spreadsheet_id: string | null
          telegram_chat_id: string | null
          telegram_enabled: boolean
          updated_at: string
        }
        Insert: {
          dispatch_token?: string
          id?: number
          sheet_enabled?: boolean
          sheet_gid?: number | null
          sheet_tab?: string | null
          spreadsheet_id?: string | null
          telegram_chat_id?: string | null
          telegram_enabled?: boolean
          updated_at?: string
        }
        Update: {
          dispatch_token?: string
          id?: number
          sheet_enabled?: boolean
          sheet_gid?: number | null
          sheet_tab?: string | null
          spreadsheet_id?: string | null
          telegram_chat_id?: string | null
          telegram_enabled?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      lead_outbox: {
        Row: {
          created_at: string
          crm_lead_id: string
          lead_id: string
          payload: Json | null
          prepared_at: string | null
          reply_text: string | null
          sheet_last_error: string | null
          sheet_lease_owner: string | null
          sheet_lease_until: string | null
          sheet_next_attempt_at: string
          sheet_retry_count: number
          sheet_row: number | null
          sheet_status: string
          sheet_synced_at: string | null
          telegram_last_error: string | null
          telegram_lease_owner: string | null
          telegram_lease_until: string | null
          telegram_message_id: number | null
          telegram_next_attempt_at: string
          telegram_retry_count: number
          telegram_sent_at: string | null
          telegram_status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          crm_lead_id: string
          lead_id: string
          payload?: Json | null
          prepared_at?: string | null
          reply_text?: string | null
          sheet_last_error?: string | null
          sheet_lease_owner?: string | null
          sheet_lease_until?: string | null
          sheet_next_attempt_at?: string
          sheet_retry_count?: number
          sheet_row?: number | null
          sheet_status?: string
          sheet_synced_at?: string | null
          telegram_last_error?: string | null
          telegram_lease_owner?: string | null
          telegram_lease_until?: string | null
          telegram_message_id?: number | null
          telegram_next_attempt_at?: string
          telegram_retry_count?: number
          telegram_sent_at?: string | null
          telegram_status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          crm_lead_id?: string
          lead_id?: string
          payload?: Json | null
          prepared_at?: string | null
          reply_text?: string | null
          sheet_last_error?: string | null
          sheet_lease_owner?: string | null
          sheet_lease_until?: string | null
          sheet_next_attempt_at?: string
          sheet_retry_count?: number
          sheet_row?: number | null
          sheet_status?: string
          sheet_synced_at?: string | null
          telegram_last_error?: string | null
          telegram_lease_owner?: string | null
          telegram_lease_until?: string | null
          telegram_message_id?: number | null
          telegram_next_attempt_at?: string
          telegram_retry_count?: number
          telegram_sent_at?: string | null
          telegram_status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_outbox_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          country_code: string | null
          created_at: string
          crm_lead_id: string | null
          email: string | null
          experience_level: string | null
          goals: string[] | null
          health_notes: string | null
          health_present: boolean | null
          health_tags: string[] | null
          id: string
          meta: Json | null
          mobile_number: string | null
          name: string
          phone_normalized_at: string | null
          phone_original: string | null
          phone_validation: string | null
          preferred_experience: string | null
          preferred_time: string | null
          session_id: string | null
          source: string | null
          status: string
          updated_at: string
          whatsapp: string
          whatsapp_full_number: string | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          crm_lead_id?: string | null
          email?: string | null
          experience_level?: string | null
          goals?: string[] | null
          health_notes?: string | null
          health_present?: boolean | null
          health_tags?: string[] | null
          id?: string
          meta?: Json | null
          mobile_number?: string | null
          name: string
          phone_normalized_at?: string | null
          phone_original?: string | null
          phone_validation?: string | null
          preferred_experience?: string | null
          preferred_time?: string | null
          session_id?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          whatsapp: string
          whatsapp_full_number?: string | null
        }
        Update: {
          country_code?: string | null
          created_at?: string
          crm_lead_id?: string | null
          email?: string | null
          experience_level?: string | null
          goals?: string[] | null
          health_notes?: string | null
          health_present?: boolean | null
          health_tags?: string[] | null
          id?: string
          meta?: Json | null
          mobile_number?: string | null
          name?: string
          phone_normalized_at?: string | null
          phone_original?: string | null
          phone_validation?: string | null
          preferred_experience?: string | null
          preferred_time?: string | null
          session_id?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          whatsapp?: string
          whatsapp_full_number?: string | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      whatsapp_clicks: {
        Row: {
          consent: string | null
          created_at: string
          cta_location: string | null
          device_type: string | null
          fbclid: string | null
          gclid: string | null
          id: string
          intent: string
          landing_path: string | null
          market: string | null
          page_path: string | null
          ref: string
          referrer_host: string | null
          session_id: string | null
          timezone: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          consent?: string | null
          created_at?: string
          cta_location?: string | null
          device_type?: string | null
          fbclid?: string | null
          gclid?: string | null
          id?: string
          intent: string
          landing_path?: string | null
          market?: string | null
          page_path?: string | null
          ref: string
          referrer_host?: string | null
          session_id?: string | null
          timezone?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          consent?: string | null
          created_at?: string
          cta_location?: string | null
          device_type?: string | null
          fbclid?: string | null
          gclid?: string | null
          id?: string
          intent?: string
          landing_path?: string | null
          market?: string | null
          page_path?: string | null
          ref?: string
          referrer_host?: string | null
          session_id?: string | null
          timezone?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_lead_outbox: {
        Args: {
          p_channel: string
          p_lease_seconds?: number
          p_limit?: number
          p_owner: string
        }
        Returns: {
          created_at: string
          crm_lead_id: string
          lead_id: string
          payload: Json | null
          prepared_at: string | null
          reply_text: string | null
          sheet_last_error: string | null
          sheet_lease_owner: string | null
          sheet_lease_until: string | null
          sheet_next_attempt_at: string
          sheet_retry_count: number
          sheet_row: number | null
          sheet_status: string
          sheet_synced_at: string | null
          telegram_last_error: string | null
          telegram_lease_owner: string | null
          telegram_lease_until: string | null
          telegram_message_id: number | null
          telegram_next_attempt_at: string
          telegram_retry_count: number
          telegram_sent_at: string | null
          telegram_status: string
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "lead_outbox"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      format_crm_lead_id: { Args: { n: number }; Returns: string }
      lead_outbox_wake: { Args: never; Returns: undefined }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      recover_lead_outbox_leases: { Args: never; Returns: undefined }
      release_automation_lock: {
        Args: { p_name: string; p_owner: string }
        Returns: undefined
      }
      try_automation_lock: {
        Args: { p_name: string; p_owner: string; p_seconds: number }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
