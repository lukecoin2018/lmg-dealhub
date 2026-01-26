export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string
          user_id: string
          brand_name: string
          contact_email: string | null
          contact_name: string | null
          past_rate: number | null
          payment_speed: string | null
          rating: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          brand_name: string
          contact_email?: string | null
          contact_name?: string | null
          past_rate?: number | null
          payment_speed?: string | null
          rating?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          brand_name?: string
          contact_email?: string | null
          contact_name?: string | null
          past_rate?: number | null
          payment_speed?: string | null
          rating?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          user_id: string
          brand_id: string | null
          deal_name: string
          brand_name: string
          amount: number
          status: string
          deliverables: string[] | null
          deadline: string | null
          payment_status: string
          payment_received: number
          notes: string | null
          contract_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          brand_id?: string | null
          deal_name: string
          brand_name: string
          amount: number
          status?: string
          deliverables?: string[] | null
          deadline?: string | null
          payment_status?: string
          payment_received?: number
          notes?: string | null
          contract_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          brand_id?: string | null
          deal_name?: string
          brand_name?: string
          amount?: number
          status?: string
          deliverables?: string[] | null
          deadline?: string | null
          payment_status?: string
          payment_received?: number
          notes?: string | null
          contract_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          user_id: string
          brand_name: string
          deal_amount: number
          deliverables: string
          contract_data: Json
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          brand_name: string
          deal_amount: number
          deliverables: string
          contract_data: Json
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          brand_name?: string
          deal_amount?: number
          deliverables?: string
          contract_data?: Json
          status?: string
          created_at?: string
        }
      }
      negotiations: {
        Row: {
          id: string
          user_id: string
          brand_name: string | null
          brand_offer: number | null
          fair_rate: number | null
          objection_type: string | null
          selected_response: string | null
          response_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          brand_name?: string | null
          brand_offer?: number | null
          fair_rate?: number | null
          objection_type?: string | null
          selected_response?: string | null
          response_text?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          brand_name?: string | null
          brand_offer?: number | null
          fair_rate?: number | null
          objection_type?: string | null
          selected_response?: string | null
          response_text?: string | null
          created_at?: string
        }
      }
      rates_calculated: {
        Row: {
          id: string
          user_id: string
          followers: number | null
          engagement_rate: number | null
          platform: string | null
          content_type: string | null
          calculated_rate: number | null
          calculation_data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          followers?: number | null
          engagement_rate?: number | null
          platform?: string | null
          content_type?: string | null
          calculated_rate?: number | null
          calculation_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          followers?: number | null
          engagement_rate?: number | null
          platform?: string | null
          content_type?: string | null
          calculated_rate?: number | null
          calculation_data?: Json | null
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          instagram_handle: string | null
          tiktok_handle: string | null
          youtube_handle: string | null
          primary_platform: string | null
          follower_count: number | null
          avg_engagement_rate: number | null
          niche: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          instagram_handle?: string | null
          tiktok_handle?: string | null
          youtube_handle?: string | null
          primary_platform?: string | null
          follower_count?: number | null
          avg_engagement_rate?: number | null
          niche?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          instagram_handle?: string | null
          tiktok_handle?: string | null
          youtube_handle?: string | null
          primary_platform?: string | null
          follower_count?: number | null
          avg_engagement_rate?: number | null
          niche?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}