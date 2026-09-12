// Generado con el MCP de Supabase (`generate_typescript_types`).
// NO editar a mano: regenerar tras cada migración.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contactos: {
        Row: {
          asunto: string | null
          created_at: string
          email: string | null
          empresa: string | null
          estado: Database["public"]["Enums"]["lead_estado"]
          id: string
          ip_hash: string | null
          locale: string
          mensaje: string
          nombre: string
          notas: string | null
          origen: string | null
          telefono: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          asunto?: string | null
          created_at?: string
          email?: string | null
          empresa?: string | null
          estado?: Database["public"]["Enums"]["lead_estado"]
          id?: string
          ip_hash?: string | null
          locale?: string
          mensaje: string
          nombre: string
          notas?: string | null
          origen?: string | null
          telefono?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          asunto?: string | null
          created_at?: string
          email?: string | null
          empresa?: string | null
          estado?: Database["public"]["Enums"]["lead_estado"]
          id?: string
          ip_hash?: string | null
          locale?: string
          mensaje?: string
          nombre?: string
          notas?: string | null
          origen?: string | null
          telefono?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      cotizaciones: {
        Row: {
          cargo: string | null
          created_at: string
          descripcion: string
          email: string
          empresa: string | null
          estado: Database["public"]["Enums"]["lead_estado"]
          id: string
          ip_hash: string | null
          locale: string
          nombre: string
          notas: string | null
          observaciones: string | null
          origen: string | null
          plazo: string | null
          presupuesto: string | null
          servicios: string[]
          superficie: string | null
          telefono: string | null
          tipo_proyecto: string | null
          ubicacion: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          cargo?: string | null
          created_at?: string
          descripcion: string
          email: string
          empresa?: string | null
          estado?: Database["public"]["Enums"]["lead_estado"]
          id?: string
          ip_hash?: string | null
          locale?: string
          nombre: string
          notas?: string | null
          observaciones?: string | null
          origen?: string | null
          plazo?: string | null
          presupuesto?: string | null
          servicios?: string[]
          superficie?: string | null
          telefono?: string | null
          tipo_proyecto?: string | null
          ubicacion?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          cargo?: string | null
          created_at?: string
          descripcion?: string
          email?: string
          empresa?: string | null
          estado?: Database["public"]["Enums"]["lead_estado"]
          id?: string
          ip_hash?: string | null
          locale?: string
          nombre?: string
          notas?: string | null
          observaciones?: string | null
          origen?: string | null
          plazo?: string | null
          presupuesto?: string | null
          servicios?: string[]
          superficie?: string | null
          telefono?: string | null
          tipo_proyecto?: string | null
          ubicacion?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      perfiles: {
        Row: {
          activo: boolean
          codigo_acceso: string | null
          codigo_actualizado_en: string | null
          creado_por: string | null
          created_at: string
          email: string
          id: string
          nombre: string | null
          rol: Database["public"]["Enums"]["rol_usuario"]
          ultimo_acceso: string | null
          updated_at: string
        }
        Insert: {
          activo?: boolean
          codigo_acceso?: string | null
          codigo_actualizado_en?: string | null
          creado_por?: string | null
          created_at?: string
          email: string
          id: string
          nombre?: string | null
          rol: Database["public"]["Enums"]["rol_usuario"]
          ultimo_acceso?: string | null
          updated_at?: string
        }
        Update: {
          activo?: boolean
          codigo_acceso?: string | null
          codigo_actualizado_en?: string | null
          creado_por?: string | null
          created_at?: string
          email?: string
          id?: string
          nombre?: string | null
          rol?: Database["public"]["Enums"]["rol_usuario"]
          ultimo_acceso?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      linea_imagenes: {
        Row: { alt: string | null; created_at: string; id: string; linea_id: string; orden: number; url: string }
        Insert: { alt?: string | null; created_at?: string; id?: string; linea_id: string; orden?: number; url: string }
        Update: { alt?: string | null; created_at?: string; id?: string; linea_id?: string; orden?: number; url?: string }
        Relationships: [
          {
            foreignKeyName: "linea_imagenes_linea_id_fkey"
            columns: ["linea_id"]
            isOneToOne: false
            referencedRelation: "lineas_producto"
            referencedColumns: ["id"]
          },
        ]
      }
      lineas_producto: {
        Row: {
          created_at: string
          descripcion: string
          es_nuevo: boolean
          id: string
          imagen: string | null
          nombre: string
          orden: number
          precio_desde: number | null
          publicado: boolean
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          descripcion: string
          es_nuevo?: boolean
          id?: string
          imagen?: string | null
          nombre: string
          orden?: number
          precio_desde?: number | null
          publicado?: boolean
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          descripcion?: string
          es_nuevo?: boolean
          id?: string
          imagen?: string | null
          nombre?: string
          orden?: number
          precio_desde?: number | null
          publicado?: boolean
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt: string | null
          bucket: string
          bytes: number | null
          created_at: string
          id: string
          mime: string | null
          path: string
          subida_por: string | null
          url: string
        }
        Insert: {
          alt?: string | null
          bucket?: string
          bytes?: number | null
          created_at?: string
          id?: string
          mime?: string | null
          path: string
          subida_por?: string | null
          url: string
        }
        Update: {
          alt?: string | null
          bucket?: string
          bytes?: number | null
          created_at?: string
          id?: string
          mime?: string | null
          path?: string
          subida_por?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_subida_por_fkey"
            columns: ["subida_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      promocion_lineas: {
        Row: { linea_id: string; promocion_id: string }
        Insert: { linea_id: string; promocion_id: string }
        Update: { linea_id?: string; promocion_id?: string }
        Relationships: [
          {
            foreignKeyName: "promocion_lineas_linea_id_fkey"
            columns: ["linea_id"]
            isOneToOne: false
            referencedRelation: "lineas_producto"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promocion_lineas_promocion_id_fkey"
            columns: ["promocion_id"]
            isOneToOne: false
            referencedRelation: "promociones"
            referencedColumns: ["id"]
          },
        ]
      }
      promociones: {
        Row: {
          activa: boolean
          created_at: string
          descripcion: string | null
          id: string
          imagen: string | null
          inicia_en: string
          termina_en: string | null
          tipo: Database["public"]["Enums"]["tipo_promocion"]
          titulo: string
          updated_at: string
          valor: string | null
        }
        Insert: {
          activa?: boolean
          created_at?: string
          descripcion?: string | null
          id?: string
          imagen?: string | null
          inicia_en?: string
          termina_en?: string | null
          tipo?: Database["public"]["Enums"]["tipo_promocion"]
          titulo: string
          updated_at?: string
          valor?: string | null
        }
        Update: {
          activa?: boolean
          created_at?: string
          descripcion?: string | null
          id?: string
          imagen?: string | null
          inicia_en?: string
          termina_en?: string | null
          tipo?: Database["public"]["Enums"]["tipo_promocion"]
          titulo?: string
          updated_at?: string
          valor?: string | null
        }
        Relationships: []
      }
      servicios: {
        Row: {
          created_at: string
          descripcion: string
          id: string
          imagen: string | null
          orden: number
          publicado: boolean
          slug: string
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          descripcion: string
          id?: string
          imagen?: string | null
          orden?: number
          publicado?: boolean
          slug: string
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          descripcion?: string
          id?: string
          imagen?: string | null
          orden?: number
          publicado?: boolean
          slug?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: {
      lead_estado: "nuevo" | "contactado" | "cotizado" | "ganado" | "perdido"
      rol_usuario: "admin" | "ventas"
      tipo_promocion: "descuento" | "paquete" | "liquidacion"
    }
    CompositeTypes: { [_ in never]: never }
  }
}
